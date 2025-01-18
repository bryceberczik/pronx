import { useEffect, useState } from "react";
import { getQuote } from "../services/getQuote";
import { getUserById } from "../services/getUserById";
import { createStep, getSteps } from "../services/stepService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [time, setTime] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasRoutine, setHasRoutine] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [stepInput, setStepInput] = useState("");
  const [steps, setSteps] = useState<any[]>([]);

  interface User {
    firstName: string;
    lastName: string;
    email: string;
    Routine?: any;
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      const formattedTime =
        hours + ":" + minutes.toString().padStart(2, "0") + " " + ampm;
      setTime(formattedTime);
    };

    const fetchQuote = async () => {
      try {
        const fetchedQuote = (await getQuote()) as {
          quote: string;
          author: string;
        };
        setQuote(fetchedQuote.quote);
        setAuthor(fetchedQuote.author);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Failed to load quote.");
        setAuthor("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    fetchQuote();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) {
      try {
        const decoded: { id: string } = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const user = (await getUserById(userId)) as User;
          setUser(user);
          setHasRoutine(!!user?.Routine);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchSteps = async () => {
      if (user?.Routine?.id) {
        const routineSteps = await getSteps(user?.Routine.id) as any[];
        setSteps(routineSteps);
        console.log(routineSteps);
      } else {
        console.log("Routine ID is not available.");
      }
    };

    fetchSteps();
  }, [user]); // Depend on 'user' so this runs after it's set

  const handleModal = () => {
    setShow(!show);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleModal();
  };

  const handleAddStepInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepInput(e.target.value);
  };

  const handleAddStep = () => {
    if (user?.Routine?.id) {
      createStep(user.Routine.id, stepInput);
      setShow(!show);
    }
  };

  return (
    <div>
      <div className="mt-20 mb-[60px]">
        <h1 className="text-center text-[#F5F5DC]">
          Welcome back, {user?.firstName}.
        </h1>
      </div>
      {/* Background div */}
      <div className="bg-[#302F2F] p-1 w-100% mx-4 rounded-[10px]">
        {/* Clock */}
        <div className="text-center text-[#F5F5DC] text-[60px]">{time}</div>
      </div>

      {/* Quote */}
      <div className="mx-4 mt-10 py-1 text-center text-[#F5F5DC] text-[18px] italic">
        {quote ? `"${quote}"` : "Loading quote..."}
        {author && <div className="mt-2 text-[20px]">- {author}</div>}
      </div>

      {/* Expandable Div */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] bg-[#302F2F] rounded-t-[10px] rounded-b-none transition-all duration-500 ${
          isExpanded ? "h-[300px]" : "h-[50px]"
        } cursor-pointer overflow-hidden`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="text-center text-[#F5F5DC] text-[20px] m-2">Routine</h1>
        {/* Content inside the expanded div */}
        {isExpanded && (
          <div className="p-2 text-[#F5F5DC] flex flex-col items-center">
            {hasRoutine ? (
              <div>
                <button
                  className="bg-[#202020] w-8 h-8 rounded-[5px] flex items-center justify-center"
                  onClick={handleButtonClick}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>

                <div>
                  {/* Steps list (just an example) */}
                  {steps.map((step) => (
                    <div key={step.id}>
                      <p>{step.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h1>Failed to find routine.</h1>
            )}
          </div>
        )}
      </div>

      {show ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <>
            <Modal
              show={show}
              onHide={handleModal}
              dialogClassName="rounded-lg shadow-xl"
              className="!m-0"
              centered
            >
              <Modal.Header
                closeButton
                className="bg-[#302F2F] text-[#F5F5DC] "
              >
                <Modal.Title className="text-lg font-semibold">
                  Add Step
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-[#302F2F] text-[#F5F5DC] text-center">
                <input
                  type="text"
                  placeholder="Add a step to the routine."
                  className="w-full px-4 py-2 bg-[#1E1E1E] text-[#F5F5DC] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onChange={handleAddStepInput}
                />
              </Modal.Body>
              <Modal.Footer className="bg-[#302F2F]">
                <Button
                  variant="secondary"
                  className="bg-gray-600 hover:bg-gray-700 text-[#F5F5DC]"
                  onClick={handleModal}
                >
                  Close
                </Button>
                <Button
                  variant="secondary"
                  className="bg-gray-600 hover:bg-gray-700 text-[#F5F5DC]"
                  onClick={handleAddStep}
                >
                  Add Step
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      ) : null}
    </div>
  );
};

export default Home;

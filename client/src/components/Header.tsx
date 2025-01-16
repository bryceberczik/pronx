import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div>
      <header className='flex flex-row justify-between items-center my-3 mx-4'>
        <h1 className="text-[#F5F5DC] text-[35px]">pronx.</h1>
        <FontAwesomeIcon className='text-[#F5F5DC] text-[30px]' icon={faBars} />
      </header>
    </div>
  );
};

export default Header;
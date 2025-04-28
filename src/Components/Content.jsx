import { Outlet } from 'react-router-dom';

const Content = () => {
  return (
    <div className="flex justify-center items-center flex-1 px-6">
     
        <Outlet />
    </div>
  );
};

export default Content;

import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode; // Опциональный проп
  // другие пропсы!!!
}

function Layout(props: LayoutProps) {
  return (
    <div>
      <main>
        <Outlet /> 
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
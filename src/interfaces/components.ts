interface ITopNavigation {
  navHeight: number;
  setNavHeight: React.Dispatch<React.SetStateAction<number>>;
}

interface IHeaderLined extends React.HTMLAttributes<HTMLDivElement> {}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconEnd?: boolean;
}
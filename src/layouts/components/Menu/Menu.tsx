type MenuProps = {
  children: React.ReactNode;
  className?: string;
};

function Menu({ children, className }: MenuProps) {
  return <nav className={className}>{children}</nav>;
}

export default Menu;

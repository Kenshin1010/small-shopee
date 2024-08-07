import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

function Wrapper({ children, className }: WrapperProps) {
  return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Wrapper;

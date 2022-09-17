import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Icon } from '@iconify/react';

interface CustomProps {
  className?: string;
  isActive?: boolean;
  isLoading?: boolean;
}

const Button = ({
  className = '',
  isActive = false,
  isLoading = false,
  children,
  ...props
}: CustomProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => {
  const [isLoadingDone, setIsLoadingDone] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoadingDone(true);
      setTimeout(() => {
        setIsLoadingDone(false);
      }, 800);
    }
  }, [isLoading]);

  return (
    <button
      className={cx(
        'flex items-center justify-center rounded-sm p-1 hover:bg-slate-400 dark:hover:bg-slate-600',
        {
          'bg-slate-400/60': isActive,
          'dark:bg-slate-600/60': isActive,
          [className]: className?.length,
        }
      )}
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {isLoading ? <Icon icon="line-md:loading-twotone-loop" /> : null}
      {isLoadingDone ? (
        <Icon icon="line-md:circle-to-confirm-circle-transition" />
      ) : null}
      {!isLoading && !isLoadingDone ? children : null}
    </button>
  );
};

export default Button;

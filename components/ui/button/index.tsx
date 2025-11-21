'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import styles from './button.module.css';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'blur' | 'outline' | 'grey';
  size?: 'default' | 'small' | 'tiny';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  (
    | ({ href: string } & { onClick?: never; type?: never })
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  );

export default function Button({
  variant = 'primary',
  size = 'default',
  icon,
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.btn,
    size !== 'default' && styles[size],
    variant !== 'primary' && styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const clickClass = variant === 'grey' ? styles.clickGrey : styles.click;
  const contentClass = variant === 'grey' ? styles.contentBlue : styles.content;

  const content = (
    <div className={clickClass}>
      <div className={contentClass}>
        {icon && icon}
        <span>{children}</span>
      </div>
    </div>
  );

  // Render as Link if href is provided
  if (href) {
    return (
      <div className={buttonClasses}>
        <Link href={href} className={clickClass}>
          <div className={contentClass}>
            {icon && icon}
            <span>{children}</span>
          </div>
        </Link>
      </div>
    );
  }

  // Render as button
  return (
    <button className={buttonClasses} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

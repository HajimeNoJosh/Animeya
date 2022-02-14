import React from 'react';

export const Button = ({className, onClick, text}) => <button className={className} onClick={onClick} type="submit">{text}</button>;

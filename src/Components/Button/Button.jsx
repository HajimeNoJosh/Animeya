import React from 'react';

export const Button = ({buttonId, className, onClick, text}) => <button id={buttonId} className={className} onClick={onClick} type="submit">{text}</button>;

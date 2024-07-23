interface MessageProps {
  message: string;
}

const ErrorMessage = ({ message }: MessageProps) => {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

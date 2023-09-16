import "../../css/message.css";

const Message = ({ message }) => {
  return (
    <>
      <div className={message?.error ? "bad-message" : "good-message"}>
        <p>{message?.text}</p>
      </div>
    </>
  );
};

export default Message;

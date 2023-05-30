import "../../css/message.css";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";

const Message = () => {
  const { flash } = usePage().props;

  useEffect(() => {
    const messageTimeOut = setTimeout(() => {
      flash.message = null;
    }, 2000);

    return () => {
      clearTimeout(messageTimeOut);
    };
  }, [flash.message]);

  return (
    <>
      {flash.message && (
        <div className={flash.message.error ? "bad-message" : "good-message"}>
          <p>{flash.message.text}</p>
        </div>
      )}
    </>
  );
};

export default Message;

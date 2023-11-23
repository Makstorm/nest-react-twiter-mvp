import { FC, useState } from "react";
import Grid from "../../components/grid";
import FieldForm from "../../components/field-form";
import { Alert, LOAD_STATUS, Loader } from "../../components/load";

interface IPostCreateProps {
  onCreate?: () => void;
  placeholder: string;
  button: string;
  id?: number | null;
}

const PostCreate: FC<IPostCreateProps> = ({
  onCreate,
  placeholder,
  button,
  id = null,
}) => {
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value: string): Promise<void> => {
    console.log({ value });
    return sendData({ value });
  };

  const sendData = async (dataToSend: { value: string }) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch("http://localhost:3000/post", {
        // mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(null);
        if (onCreate) onCreate();
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (e) {
      if (e instanceof Error) {
        setMessage(e.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    }
  };

  const convertData = ({ value }: { value: string }) => {
    return id
      ? JSON.stringify({
          text: value,
          username: "user",
          postId: id,
        })
      : JSON.stringify({
          text: value,
          username: "user",
        });
  };

  return (
    <Grid>
      <FieldForm
        button={button}
        placeholder={placeholder}
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}

      {status === LOAD_STATUS.PROGRESS && <Loader />}
    </Grid>
  );
};

export default PostCreate;

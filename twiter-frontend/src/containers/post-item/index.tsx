import { FC, Fragment, useState } from "react";
import Box from "../../components/box";
import PostContent from "../../components/post-content";
import Grid from "../../components/grid";
import PostCreate from "../post-create";
import { Alert, LOAD_STATUS, Skeleton } from "../../components/load";
import { ITwit } from "../post-list";
import { getDate } from "../../ustil/getDate";

interface IPostItemProps {
  id: number;
  username: string;
  text: string;
  date: string;
}

const PostItem: FC<IPostItemProps> = ({ id, username, text, date }) => {
  const [data, setData] = useState<
    | {
        id: number;
        username: string;
        text: string;
        date: string;
        reply:
          | {
              id: number;
              username: string;
              text: string;
              date: string;
            }[]
          | undefined;
        isEmpty: boolean;
      }
    | {
        id: number;
        username: string;
        text: string;
        date: string;
        reply: null;
        isEmpty: boolean;
      }
  >({
    id,
    username,
    text,
    date,
    reply: null,
    isEmpty: true,
  });

  const [isOpen, setOpen] = useState(false);

  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch(`http://localhost:3000/post/item?id=${data.id}`);

      const resData = await res.json();

      if (res.ok) {
        setData(convertData(resData));
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setMessage(resData.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (e) {
      if (e instanceof Error) {
        setMessage(e.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    }
  };

  const convertData = (twit: ITwit) => ({
    id: twit.id,
    username: twit.username,
    text: twit.text,
    date: getDate(twit.date),

    reply: twit.reply?.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),

    isEmpty: twit.reply?.length === 0,
  });

  const handleOpen = () => {
    if (status === null) {
      getData();
    }

    setOpen(!isOpen);
  };

  return (
    <Box style={{ padding: "0" }}>
      <div style={{ padding: "20px", cursor: "pointer" }} onClick={handleOpen}>
        <PostContent
          username={data.username}
          date={data.date}
          text={data.text}
        />
      </div>

      {isOpen && (
        <div style={{ padding: "0 20px 20px 20px" }}>
          <Grid>
            <Box className="post-item__inside-box">
              <PostCreate
                placeholder="Post your reply!"
                button="Reply"
                id={data.id}
                onCreate={getData}
              />
            </Box>
            {status === LOAD_STATUS.PROGRESS && (
              <Fragment>
                <Box>
                  <Skeleton />
                </Box>
                <Box>
                  <Skeleton />
                </Box>
              </Fragment>
            )}

            {status === LOAD_STATUS.ERROR && (
              <Alert status={status} message={message} />
            )}

            {status === LOAD_STATUS.SUCCESS &&
              data.isEmpty === false &&
              data.reply?.map((item) => (
                <Fragment key={item.id}>
                  <Box>
                    <PostContent {...item} />
                  </Box>
                </Fragment>
              ))}
          </Grid>
        </div>
      )}
    </Box>
  );
};

export default PostItem;

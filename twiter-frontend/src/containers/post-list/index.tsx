import React, { Fragment, useState } from "react";
import Grid from "../../components/grid";
import Box from "../../components/box";
import Title from "../../components/title";
import PostCreate from "../post-create";
import { Alert, LOAD_STATUS, Skeleton } from "../../components/load";
import { getDate } from "../../ustil/getDate";
import PostItem from "../post-item";

export interface ITwit {
  username: string;
  text: string;
  id: number;
  date: number;
  reply?: ITwit[] | null;
}

const PostList = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<{
    list: {
      id: number;
      username: string;
      text: string;
      date: string;
    }[];
    isEmpty: boolean;
  } | null>(null);

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch("http://localhost:3000/post");

      const data = await res.json();

      if (res.ok) {
        setData(convertData(data));
        setStatus(LOAD_STATUS.SUCCESS);
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

  const convertData = (raw: ITwit[]) => {
    return {
      list: raw.reverse().map(({ id, username, text, date }) => ({
        id,
        username,
        text,
        date: getDate(date),
      })),

      isEmpty: raw.length === 0,
    };
  };

  if (status === null) {
    getData();
  }

  return (
    <Grid>
      <Box>
        <Grid>
          <Title>Home</Title>
          <PostCreate
            onCreate={getData}
            placeholder="What is happening?!"
            button="Post"
          />
        </Grid>
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
        <Fragment>
          <Alert status={status} message={message} />
        </Fragment>
      )}

      {status === LOAD_STATUS.SUCCESS && (
        <Fragment>
          {data?.isEmpty ? (
            <Alert message="Список постів пустий" />
          ) : (
            data?.list.map((item) => (
              <Fragment key={item.id}>
                <PostItem {...item} />
              </Fragment>
            ))
          )}
        </Fragment>
      )}
    </Grid>
  );
};

export default PostList;

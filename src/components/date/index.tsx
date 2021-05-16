import React, {
  FC, ReactElement, memo, useState, useEffect,
} from 'react';

const MyDate: FC = (): ReactElement => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const time = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <>{`北京时间 ${currentTime}`}</>
  );
};

export default memo(MyDate);

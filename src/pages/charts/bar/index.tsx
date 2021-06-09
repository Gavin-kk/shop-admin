import React, {
  FC, ReactElement, memo, useMemo,
} from 'react';
import EChartsReact from 'echarts-for-react';
import { Button, Card } from 'antd';

const Bar: FC = (): ReactElement => {
  const option = useMemo(() => ({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    }],
  }), []);

  return (
    <Card title={<Button>你好</Button>}>
      <EChartsReact option={option} />
    </Card>
  );
};

export default memo(Bar);

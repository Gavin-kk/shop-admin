import { RouteConfigComponentProps } from 'react-router-config';
import React, {
  FC, memo, ReactElement, useEffect, useState,
} from 'react';
import {
  Card, Image, List, Spin, Tag,
} from 'antd';
import Breadcrumbs from '@components/breadcrumbs';
import { errorImg } from '@assets/img/img-error';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import moment from 'moment';
import { momentConfig } from '@src/config/moment-config';
import { ListWrapper } from './style';
import { getGoodsDetailAction } from '../../store/action-creators';

moment.locale('zh-cn', momentConfig);

interface Params {
  id: string
}

const DetailProduct: FC<RouteConfigComponentProps<Params>> = (props: RouteConfigComponentProps<Params>): ReactElement => {
  const { detail } = useSelector((state: IRootReducerStateType) => ({
    detail: state.product.detail,
  }), shallowEqual);
  const [whetherToLoad, setWhetherToLoad] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(getGoodsDetailAction(parseInt(id, 10)));
  }, []);

  useEffect(() => {
    if (detail) {
      setWhetherToLoad(false);
    }
    const preview = document.querySelectorAll('.ant-image-mask-info');
    if (preview) {
      preview.forEach((item) => {
        item.innerHTML = '预览';
      });
    }
  }, [detail]);

  const imgs = detail ? JSON.parse(detail.imgs) as string[] : 'null';

  const category = () => (detail ? detail.classifyName.map((item: string, index: number) => {
    if (index === detail.classifyName.length - 1) {
      return (
        <Tag key={item} className="classify">
          {item}
        </Tag>
      );
    }
    return (
      <>
        <Tag key={item} className="classify">
          {item}
        </Tag>
        <span style={{ paddingRight: 6 }}>{'>'}</span>
      </>
    );
  }) : null);
  return (
    <Card
      title={<Breadcrumbs />}
      style={{
        width: '100%',
        height: 750,
      }}
    >
      {detail && (
        <ListWrapper>
          <Spin className="detail-loading" spinning={whetherToLoad} delay={200} />
          <List
            size="large"
            bordered
          >
            <List.Item>
              <span>商品名称 ：</span>
              <span>{detail.name}</span>
            </List.Item>
            <List.Item>
              <span>商品描述 ：</span>
              <span>{detail.desc}</span>
            </List.Item>
            <List.Item>
              <span>商品价格 ：</span>
              <span>
                {detail.price}
                元
              </span>
            </List.Item>
            <List.Item className="img-item">
              <span>商品图片 ：</span>
              <div className="img">
                {(imgs as string[]).length ? (imgs as string[]).map((item) => (
                  <Image
                    key={item.replace(',', '')}
                    width={200}
                    src={item.replace(',', '')}
                    fallback={errorImg}
                  />
                )) : <span>暂无图片</span>}
              </div>
            </List.Item>
            <List.Item>
              <div className="detail-box">
                <div className="detail-desc">
                  商品详情 ：
                </div>
                <div className="detail">
                  <p>{detail.detail}</p>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <span>所属分类 ：</span>
              {category()}
            </List.Item>
            <List.Item>
              <span>创建时间 ：</span>
              <span>
                {moment(parseInt(detail.createAt, 10) * 1000)
                  .format('llll')}
              </span>
            </List.Item>
            <List.Item>
              <span>更新时间 ：</span>
              <span>
                {moment(parseInt(detail.updateAt, 10) * 1000)
                  .format('llll')}
              </span>
            </List.Item>
          </List>
        </ListWrapper>
      )}
    </Card>
  );
};

export default memo(DetailProduct);

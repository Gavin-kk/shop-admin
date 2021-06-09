import { RouteConfigComponentProps } from 'react-router-config';
import React, {
  FC, memo, ReactElement, useEffect, useState, Fragment,
} from 'react';
import {
  Card, Image, List, message, Spin, Tag,
} from 'antd';
import Breadcrumbs from '@components/breadcrumbs';
import { errorImg } from '@assets/img/img-error';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import moment from 'moment';
import { momentConfig } from '@src/config/moment-config';
import { useHistory } from 'react-router-dom';
import { ListWrapper } from './style';
import { getGoodsDetailAction } from '../../store/action-creators';

moment.locale('zh-cn', momentConfig);

const DetailProduct: FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps): ReactElement => {
  const { detail } = useSelector((state: IRootReducerStateType) => ({
    detail: state.product.detail,
  }), shallowEqual);
  const [whetherToLoad, setWhetherToLoad] = useState<boolean>(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const id:number | undefined = props.location.state as number;
    if (!id) {
      history.replace('/admin/product');
      message.error('非法访问');
    }
    dispatch(getGoodsDetailAction(id));
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
  const category = () => (detail ? detail.classifyName.map((item, index: number) => {
    if (index === detail.classifyName.length - 1) {
      return (
        <Fragment key={item.id}>
          <Tag className="classify">
            {item.name}
          </Tag>
        </Fragment>

      );
    }
    return (
      <Fragment key={item.id}>
        <Tag className="classify">
          {item.name}
        </Tag>
        <span style={{ paddingRight: 6 }}>{'>'}</span>
      </Fragment>
    );
  }) : null);
  return (
    <Card
      title={<Breadcrumbs />}
      style={{
        width: '100%',
      }}
    >
      {detail && (
        <ListWrapper>
          <Spin className="detail-loading" spinning={whetherToLoad} delay={200} />
          <List
            size="large"
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
                    key={item}
                    width={200}
                    src={item.replace(',', '')}
                    fallback={errorImg}
                  />
                )) : <span>暂无图片</span>}
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
            <List.Item>
              <div className="detail-box">
                <div className="detail-desc">
                  商品详情 ：
                </div>
                {/* eslint-disable-next-line react/no-danger */}
                {detail.detail ? <div className="detail" dangerouslySetInnerHTML={{ __html: detail.detail }} /> : <div>null</div> }
              </div>
            </List.Item>
          </List>
        </ListWrapper>
      )}
    </Card>
  );
};

export default memo(DetailProduct);

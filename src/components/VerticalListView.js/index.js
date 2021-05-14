import React from 'react';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {
  PRODUCT_ITEM_SIZE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../../constants/sizes';

const ViewTypes = {
  TWO_COLUMN: 'TWO_COLUMN',
};

export class LayoutUtil {
  static getWindowWidth() {
    return Math.round(WINDOW_WIDTH);
  }

  static getWindowHeight() {
    return WINDOW_HEIGHT;
  }

  static getLayoutProvider() {
    return new LayoutProvider(
      () => {
        return ViewTypes.TWO_COLUMN;
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.TWO_COLUMN:
            dim.width = Math.floor(LayoutUtil.getWindowWidth() / 2);
            dim.height = PRODUCT_ITEM_SIZE;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
            break;
        }
      },
    );
  }
}

export default function VerticalListView({
  state,
  listData,
  rowRenderer,
  ...otherProps
}) {
  return listData.length > 0 ? (
    <RecyclerListView
      contentContainerStyle={{marginLeft: 2, marginRight: 5}}
      layoutProvider={state.layoutProvider}
      dataProvider={state.dataProvider}
      rowRenderer={rowRenderer}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    />
  ) : null;
}

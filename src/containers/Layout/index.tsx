import React from 'react';
import classNames from 'classnames';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './layout.module.scss';

interface Props {
  withoutFooter?: boolean;
  withoutHeader?: boolean;
  fullSizeContent?: boolean;
  blurGatsbyWrapper?: boolean;
}

const blurActiveElement = () => {
  if (document.activeElement && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  withoutFooter,
  withoutHeader,
  fullSizeContent,
  blurGatsbyWrapper,
}) => (
  <div
    className={classNames(styles.pageWrapper, {
      [styles.fullSizeContent]: fullSizeContent,
    })}
  >
    {!withoutHeader && <Header siteTitle={'Alexandr Tovmach website'} />}
    <main onClick={blurGatsbyWrapper && blurActiveElement}>{children}</main>
    {!withoutFooter && <Footer />}
  </div>
);

export default Layout;

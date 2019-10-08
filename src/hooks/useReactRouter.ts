import { useContext, useEffect } from 'react';
import { __RouterContext, RouteComponentProps, StaticContext } from 'react-router';
import useForceUpdate from 'use-force-update';

export function useReactRouter(): RouteComponentProps<{}, StaticContext, any> {
  const forceUpdate = useForceUpdate();
  const routerContext = useContext(__RouterContext);
  useEffect(
    () => routerContext.history.listen(forceUpdate),
    // eslint-disable-next-line
    [ routerContext ]
  );
  return routerContext;
};
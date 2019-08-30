import { useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router';
import useForceUpdate from 'use-force-update';

export const useReactRouter = () => {
  const forceUpdate = useForceUpdate();
  const routerContext = useContext(__RouterContext);
  useEffect(
    () => routerContext.history.listen(forceUpdate),
    [ routerContext ]
  );
  return routerContext;
};
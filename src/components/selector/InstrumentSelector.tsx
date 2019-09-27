import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Tab, Tabs, Theme, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { InstrumentType } from '../../model/InstrumentType';
import ChordSelector, { TParams } from './ChordSelector';
import { useReactRouter } from '../../hooks/useReactRouter';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { RouteComponentProps, StaticContext } from 'react-router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}));


const InstrumentSelector: React.FC = () => {
  const service = useChordService("instrumentList")
  const { history, match } = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const classes = useStyles();

  let instrumentParam: InstrumentType
  if (match.params.instrument !== undefined) {
    instrumentParam = match.params.instrument as InstrumentType;
  } else {
    instrumentParam = 'ukulele';
  }

  const [value, setValue] = React.useState(0);
  type routeInfoType = {[instrument in InstrumentType]: string};
  const [routeInfos, setRouteInfos] = React.useState<routeInfoType>({} as routeInfoType);
  let dataToDisplay: InstrumentType[] = [];

  const handleOnChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setRouteInfos({ ...routeInfos, [dataToDisplay[value] as InstrumentType]: history.location.pathname });
    setValue(newValue);
    let newHistory = '';
    if (routeInfos[dataToDisplay[newValue]] && routeInfos[dataToDisplay[newValue]] !== null ) {
      newHistory = routeInfos[dataToDisplay[newValue]];
    }
    history.replace(newHistory === '' ? CHORD_VIEWER_BASE_ROUTE + '/' + dataToDisplay[newValue] : newHistory)
  }

  
  if (service.status === 'loaded') {
    dataToDisplay = (service.payload.data as InstrumentType[]);
    let index = dataToDisplay.findIndex(elem => elem === instrumentParam);
    // if (value !== index) setValue(index === -1 ? 0 : index)
  }

  return (
      <div className={classes.root}>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        <div>
          <Tabs value={value} onChange={handleOnChange} centered>
            {dataToDisplay.map((elem, index) => <Tab key={elem} label={elem} {...a11yProps(index)}></Tab>)}
          </Tabs>
          {dataToDisplay.map((elem, index) => <TabPanel key={elem} index={index} value={value}>
            <ChordSelector instrument={elem}></ChordSelector>
          </TabPanel>)}
        </div>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default InstrumentSelector;
import React from 'react';
import { Tab, Tabs, Theme, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { InstrumentType } from '../../model/InstrumentType';
import ChordSelector, { TParams } from './ChordSelector';
import { useReactRouter } from '../../hooks/useReactRouter';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { RouteComponentProps, StaticContext } from 'react-router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

const INSTRUMENT_QUERY = gql`
  {
    instruments {
      id
      name
    }
  }
`;

type instrumentSelectorProp = { noViewer: boolean }

const InstrumentSelector: React.FC<instrumentSelectorProp> = ({ noViewer }) => {
  const { loading, error, data } = useQuery(INSTRUMENT_QUERY);
  const { history, match } = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const classes = useStyles();

  let instrumentParam: InstrumentType
  if (match.params.instrument !== undefined && noViewer === false) {
    instrumentParam = match.params.instrument as InstrumentType;
  } else if (noViewer === false) {
    instrumentParam = 'ukulele';
  }

  const [value, setValue] = React.useState(0);
  type routeInfoType = {[instrument in InstrumentType]: string};
  const [routeInfos, setRouteInfos] = React.useState<routeInfoType>({} as routeInfoType);
  let dataToDisplay: {name: InstrumentType, id: string}[] = [];

  const handleOnChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    let instrumentName = dataToDisplay.map(instrument => instrument.name);
    setRouteInfos({ ...routeInfos, [instrumentName[value] as InstrumentType]: history.location.pathname });
    setValue(newValue);
    if (noViewer) return
    let newHistory = '';
    if (routeInfos[instrumentName[newValue]] && routeInfos[instrumentName[newValue]] !== null ) {
      newHistory = routeInfos[instrumentName[newValue]];
    }
    history.replace(newHistory === '' ? CHORD_VIEWER_BASE_ROUTE + '/' + instrumentName[newValue] : newHistory)
  }

  if (loading === false && error === undefined) {
    dataToDisplay = data.instruments;
    if (noViewer === false) {
      let index = dataToDisplay.findIndex(elem => elem.name === instrumentParam);
      if (value !== index) setValue(index === -1 ? 0 : index)
    }
  }

  return (
      <div className={classes.root}>
        {loading === true && <div>Loading...</div>}
        {loading === false && error === undefined && (
        <div>
          <Tabs value={value} onChange={handleOnChange} centered>
            {dataToDisplay.map((instrument, index) => <Tab key={instrument.id} label={instrument.name} {...a11yProps(index)}></Tab>)}
          </Tabs>
          {dataToDisplay.map((instrument, index) => 
            <TabPanel key={instrument.id} index={index} value={value}>
              <ChordSelector noViewer={noViewer} instrumentId={instrument.id} instrumentName={instrument.name}></ChordSelector>
            </TabPanel>
          )}
        </div>
        )}
        {error !== undefined && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default InstrumentSelector;
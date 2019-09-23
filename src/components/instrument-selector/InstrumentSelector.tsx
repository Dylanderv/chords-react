import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';
import { useReactRouter } from '../../hooks/useReactRouter';
import { SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, Accordion, AccordionItem, Header, HeaderName, SkipToContent } from 'carbon-components-react';
import { IPayloadChordNameItem } from '../../model/IPayloadChordInstrumentList';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { Link, Route } from "react-router-dom";
import ChordViewer from '../chords-viewer/ChordViewer';


const InstrumentSelector: React.FC = () => {
  const service = useChordService("chordName") as Service<{type: 'chordName', data: IPayloadChordNameItem[]}>;
  const router = useReactRouter();
  let splittedLocation = router.location.pathname.split('/');

  let currentMainChord: string = '';
  let currentSuffix: string = '';
  let currentInstrument: string = '';

  if (splittedLocation.length >= 4) {
    currentMainChord = splittedLocation[3];
    currentSuffix = splittedLocation[4];
    currentInstrument = splittedLocation[2];
  }
  console.log(currentInstrument, currentMainChord, currentSuffix)

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <div>
          <SideNav expanded={true} isChildOfHeader={true} aria-label="Side navigation">
            <SideNavItems>
              <Accordion>
                {service.payload.data.map(instrument => 
                  <AccordionItem key={instrument.type} title={instrument.type.toLocaleUpperCase()}>
                    <SideNavItems>
                      {instrument.main.map(mainChord => 
                        <SideNavMenu key={mainChord} title={mainChord} isActive={mainChord === currentMainChord && instrument.type === currentInstrument}>
                          {suffixDisplayer(instrument, mainChord, currentMainChord, currentSuffix, currentInstrument)}
                        </SideNavMenu>
                      )}
                    </SideNavItems>
                  </AccordionItem>
                )}
              </Accordion>
            </SideNavItems>
          </SideNav>
        </div>
      )}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

function suffixDisplayer(instrument: IPayloadChordNameItem, mainChord: string, currentMainChord: string, currentSuffix: string, currentInstrument: string) {
  let tenFirst: string[];
  let lasts: string[];
  if (instrument.type !== 'piano') {
    tenFirst = instrument.suffixes.slice(0, 10);
    lasts = instrument.suffixes.slice(10);
  } else {
    let suffixes = instrument.suffixes.filter(suffix => suffix.charAt(0) === mainChord);
    let suffixesTmp = suffixes //suffixes.map(suffix => suffix.substr(1));
    tenFirst = suffixesTmp.slice(0, 10);
    lasts = suffixesTmp.slice(10);

  }
  return (
    <div>
      {tenFirst.map(firstItem => 
        <SideNavMenuItem isActive={mainChord === currentMainChord && instrument.type === currentInstrument && currentSuffix === firstItem} key={firstItem} element={(Link as unknown as string)} to={CHORD_VIEWER_BASE_ROUTE + "/" + instrument.type + "/" + mainChord + "/" + firstItem}>
            {firstItem}
        </SideNavMenuItem>)}
      {/* <SideNavMenuItem>
        <OverflowMenu>
          {lasts.map(lastItem => 
            <OverflowMenuItem itemText={lastItem}/>
          )}
        </OverflowMenu>
      </SideNavMenuItem> */}
    </div>
  )
}

export default InstrumentSelector;

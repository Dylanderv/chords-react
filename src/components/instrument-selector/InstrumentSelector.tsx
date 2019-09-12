import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';
import { useReactRouter } from '../../hooks/useReactRouter';
import { SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, Accordion, AccordionItem, Header, HeaderName, OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { IPayloadChordNameItem } from '../../model/IPayloadChordInstrumentList';

let selected: string;

const InstrumentSelector: React.FC = () => {
  const service = useChordService("chordName") as Service<{type: 'chordName', data: IPayloadChordNameItem[]}>;
  const { history } = useReactRouter();
  let data = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
  }

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <div>
          <Header aria-label="Chords-react">
            <HeaderName href="#" prefix="">
              Chords-react
            </HeaderName>
          </Header>
          <SideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation">
            <SideNavItems>
              <Accordion>
                {service.payload.data.map(instrument => 
                  <AccordionItem title={instrument.type.toLocaleUpperCase()}>
                    <SideNavItems>
                      {instrument.main.map(mainChord => 
                        <SideNavMenu title={mainChord}>
                          {suffixDisplayer(instrument, mainChord)}
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

function suffixDisplayer(instrument: IPayloadChordNameItem, mainChord: string) {
  let tenFirst: string[];
  let lasts: string[];
  if (instrument.type !== 'piano') {
    tenFirst = instrument.suffixes.slice(0, 10);
    lasts = instrument.suffixes.slice(10);  
  } else {
    let suffixes = instrument.suffixes.filter(suffix => suffix.charAt(0) === mainChord);
    tenFirst = suffixes.slice(0, 10);
    lasts = suffixes.slice(10);
  }
  return (
    <div>
      {tenFirst.map(firstItem => <SideNavMenuItem>{firstItem}</SideNavMenuItem>)}
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

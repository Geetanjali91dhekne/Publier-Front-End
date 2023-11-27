import React, { useMemo, useState } from 'react'
import PTabs from '../../../../../../common/Tabs'
import AllWidgets from './WidgetTypes/AllWidgets';
import LiveWidgets from './WidgetTypes/LiveWidgets';
import OfflineWidgets from './WidgetTypes/OfflineWidgets';

const Widgets: React.FC = () => {
     const [activeTab, setActiveTab] = useState('All');

     const onTabChange = (tab: string) => {
          setActiveTab(tab);
     };
     const tabComponents = useMemo(() => {
          switch (activeTab) {
               case 'All':
                    return <AllWidgets />;
               case 'Live':
                    return <LiveWidgets />;
               case 'Offline':
                    return <OfflineWidgets />;
               default:
                    return null;
          }
     }, [activeTab]);
     return (
          <div>
               <div className='px-5'>
                    <PTabs
                         activeTab={activeTab}
                         setActiveTab={onTabChange}
                         tabs={[
                              { key: 'All', title: 'All' },
                              { key: 'Live', title: 'Live' },
                              { key: 'Offline', title: 'Offline' },
                         ]}
                    />
                    {tabComponents}
               </div>
          </div>
     )
}

export default Widgets
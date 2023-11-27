import React from 'react';

export interface TabView {
    key: string;
    title: string;
    accessDenied?: boolean;
}

type Props = {
    tabs: TabView[];
    activeTab: string;
    setActiveTab: (args: string) => void;
};

const PTabs: React.FC<Props> = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div id="tabs" className="w-full pt-4">
            <div className="w-full">
                <div className="flex right-auto top-8 bottom-0 mx-auto overflow-auto border-black border-b">
                    {tabs.map((item) => (
                        <div key={item.title} className={!item.accessDenied ? 'mr-6 lg:mr-12' : ''}>
                            {!item.accessDenied && (
                                <div onClick={() => setActiveTab(item.key)} className="relative cursor-pointer w-max">
                                    {<p className={item.key === activeTab ? 'font-medium activeTab roboto-medium mb-2 text-base' : 'font-normal text-light-grey roboto mb-2 text-base'}>{item.title}</p>}
                                    {item.key === activeTab && <div className="down-tab-bar" />}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PTabs;

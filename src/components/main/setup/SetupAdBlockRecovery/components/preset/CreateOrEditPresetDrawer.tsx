import { DatePicker, Drawer, Spin, Switch } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { RoundButton } from '../../../../../common/Button';
import CommonDropDown from '../../../../../common/CommonDropDown';
import PNormalInput from '../../../../../common/NormalInput';
import CustomDateInput from '../../../../../common/CustomDateInput';
import OtherPresets from './advanceSetting';
import PreviewDrawer from './preview/PreviewDrawer';
import PreviewBox from './preview/PreviewBox';
import countriesLangCode from '../../../../../common/countries';
import PresetAppearance from './customizeAppearance';
import { useDispatch, useSelector } from 'react-redux';
import SetupAdBlockRecoveryActions from '../../redux/actions';
import { CreatePreset, Preset } from '../../redux/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import { RootState } from '../../../../../../store/RootReducer';
import Apis from '../../../../../../api';
import MessageActions from '../../../../../message/redux/actions';
//import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import adblockRecoverySetupUtils from '../../utils';

import RichEditor from '../Editor';
import { EditorState } from 'draft-js';
import { CountryCodes } from '../../../../../common/countries';
//import axios from 'axios';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

type Props = {
    siteId: string;
    widgetId?: string;
    allPresets: Preset[];
};

const CreateOrEditPresetDrawer: React.FC<Props> = ({ siteId, widgetId, allPresets }) => {
    const dispatch = useDispatch();

    const preData = useSelector((state: RootState) => state.setupAdblockRecovery.presetByWidId);
    const presetByWidIdLoader = useSelector((state: RootState) => state.setupAdblockRecovery.presetByWidIdLoader);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [countDates, setCountDates] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState<{ status: boolean; msg: string }[]>([]);
    const [isValidate, setValidate] = useState(false);
    const [description, setDescription] = useState<undefined | EditorState>(undefined);
    const [newPreset, setNewPreset] = useState<CreatePreset>({
        site_id: siteId,
        nick_name: '',
        notice_text: '',
        notice_text_language: 'en',
        start_immediately: true,
        start_with_enddate: 0,
        prior_end_date: null,
        schedule_preset: [{ startDate: '', endDate: '' }],
        countries: [],
        browsers: [],
        desktop_preview: false,
        tablet_preview: false,
        mobile_preview: false,
        notice_location: 'top',
        show_notice_after: '0',
        hide_notice_status: false,
        hide_notice: '1',
        hide_notice_for: '1',
        lock_access_status: false,
        lock_access: '1',
        lock_access_for: '1',
        allow_close: false,
        blur_content: false,
        blur_content_percentage: 1,
        show_whitelist_instructions: false,
        show_visits_left: false,
        notice_bg_color: '#ffffff',
        notice_text_color: '#000000',
        notice_border_width: '1',
        notice_border_color: '#000000',
        link_color: '#000000',
        link_hover_color: '#ffffff',
        close_btn_bg_color: '#ffffff',
        close_btn_font_color: '#000000',
        whitelist_btn_color: '#ffffff',
        whitelist_btn_font_color: '#000000',
        whitelist_btn_location: 'left',
    });

    const onCloseDrawer = () => {
        setOpenDrawer(false);
        //setDescription(adblockRecoverySetupUtils.getEditorStateByString(''));
    };

    useEffect(() => {
        if (widgetId && preData) {
            if (preData.notice_text) {
                setDescription(adblockRecoverySetupUtils.getEditorStateByString(preData.notice_text));
            }
            setNewPreset({
                site_id: preData?.site_id,
                nick_name: preData?.nick_name,
                notice_text: preData?.notice_text,
                notice_text_language: preData?.notice_text_language,
                start_immediately: preData?.start_immediately,
                start_with_enddate: preData?.start_with_enddate,
                prior_end_date: preData?.prior_end_date,
                schedule_preset: handleEditDates(preData?.schedule_preset),
                countries: preData?.countries,
                browsers: preData?.browsers,
                desktop_preview: preData?.desktop_preview,
                tablet_preview: preData?.tablet_preview,
                mobile_preview: preData?.mobile_preview,
                notice_location: preData?.notice_location,
                show_notice_after: preData?.show_notice_after,
                hide_notice_status: preData?.hide_notice_status,
                hide_notice: preData?.hide_notice_status ? String(preData?.hide_notice) : '1',
                hide_notice_for: preData?.hide_notice_status ? String(preData?.hide_notice_for) : '1',
                lock_access_status: preData?.lock_access_status,
                lock_access: preData?.lock_access_status ? String(preData?.lock_access) : '1',
                lock_access_for: preData?.lock_access_status ? String(preData?.lock_access_for) : '1',
                allow_close: preData?.allow_close,
                blur_content: preData?.blur_content === 1 ? true : false,
                blur_content_percentage: preData?.blur_content_percentage,
                show_whitelist_instructions: preData?.show_whitelist_instructions,
                show_visits_left: preData?.show_visits_left,
                notice_bg_color: preData?.preset_style?.notice_bg_color,
                notice_text_color: preData?.preset_style?.notice_text_color,
                notice_border_width: preData?.preset_style?.notice_border_width,
                notice_border_color: preData?.preset_style?.notice_border_color,
                link_color: preData?.preset_style?.link_color,
                link_hover_color: preData?.preset_style?.link_hover_color,
                close_btn_bg_color: preData?.preset_style?.close_btn_bg_color,
                close_btn_font_color: preData?.preset_style?.close_btn_font_color,
                whitelist_btn_color: preData?.preset_style?.whitelist_btn_color,
                whitelist_btn_font_color: preData?.preset_style?.whitelist_btn_font_color,
                whitelist_btn_location: preData?.preset_style?.whitelist_btn_location,
            });
        }
    }, [preData, widgetId]);

    useEffect(() => {
        if (openDrawer && !widgetId) {
            setTimeout(() => {
                setDescription(adblockRecoverySetupUtils.getEditorStateByString(''));
            }, 500);

            setNewPreset({
                site_id: siteId,
                nick_name: '',
                notice_text: '',
                notice_text_language: 'en',
                start_immediately: true,
                start_with_enddate: 0,
                prior_end_date: null,
                schedule_preset: [{ startDate: '', endDate: '' }],
                countries: ['All'],
                browsers: ['All'],
                desktop_preview: true,
                tablet_preview: true,
                mobile_preview: false,
                notice_location: 'top',
                show_notice_after: '0',
                hide_notice_status: false,
                hide_notice: '1',
                hide_notice_for: '1',
                lock_access_status: false,
                lock_access: '1',
                lock_access_for: '1',
                allow_close: false,
                blur_content: false,
                blur_content_percentage: 1,
                show_whitelist_instructions: false,
                show_visits_left: false,
                notice_bg_color: '#ffffff',
                notice_text_color: '#000000',
                notice_border_width: '1',
                notice_border_color: '#000000',
                link_color: '#000000',
                link_hover_color: '#ffffff',
                close_btn_bg_color: '#ffffff',
                close_btn_font_color: '#000000',
                whitelist_btn_color: '#ffffff',
                whitelist_btn_font_color: '#000000',
                whitelist_btn_location: 'left',
            });
        }
    }, [widgetId, openDrawer, siteId]);

    const onClickCreateOrEdit = () => {
        setOpenDrawer(true);
    };

    useEffect(() => {
        if (widgetId && openDrawer) {
            dispatch(SetupAdBlockRecoveryActions.fetchPresetSetupAdblock(widgetId));
        }
    }, [dispatch, widgetId, openDrawer]);

    useEffect(() => {
        if (newPreset?.prior_end_date === null) {
            let temp_schedule_preset = [{ startDate: '', endDate: '' }];
            setNewPreset({
                ...newPreset,
                schedule_preset: temp_schedule_preset,
            });
        } else {
            newPreset?.schedule_preset.forEach((item: any, key: any) => {
                let dates = newPreset?.schedule_preset;
                if (dayjs(item?.startDate) < dayjs(newPreset?.prior_end_date)) {
                    dates[key].startDate = '';
                    setNewPreset({
                        ...newPreset,
                        schedule_preset: dates,
                    });
                }
                if (item?.startDate === '') {
                    dates[key].endDate = '';
                    setNewPreset({
                        ...newPreset,
                        schedule_preset: dates,
                    });
                }
            });
        }
        if (newPreset?.schedule_preset?.length > 1) {
            newPreset?.schedule_preset?.forEach((item: any, key: any) => {
                const dates = newPreset?.schedule_preset;
                if (item.startDate === '' && item.endDate === '') {
                    dates?.splice(key, 1);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newPreset?.prior_end_date]);

    useEffect(() => {
        setNewPreset({
            ...newPreset,
            prior_end_date: null,
            schedule_preset: [{ startDate: '', endDate: '' }],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newPreset?.start_immediately])

    const isDuplicate = useMemo(() => {
        const index = allPresets?.filter((s: any) => s.nick_name?.toLowerCase() === newPreset.nick_name?.toLowerCase());

        if (widgetId) {
            if (index?.length > 1) {
                return true;
            } else {
                if (index?.length === 1 && widgetId !== index[0]?.widget_id) {
                    return true;
                }
                return false;
            }
        } else {
            if (index?.length > 0) {
                return true;
            }
            return false;
        }
    }, [allPresets, widgetId, newPreset.nick_name]);

    const validateDates = () => {
        for (let i = 0; i < newPreset?.schedule_preset?.length; i++) {
            let dates = newPreset?.schedule_preset[i];
            if (dates?.startDate === '' || dates?.endDate === '') {
                return true;
            }
        }
        return false
    }

    const creteOrUpdatePreset = () => {
        setValidate(true);
        if (
            !newPreset.nick_name ||
            newPreset.nick_name.trim() === '' ||
            !description ||
            adblockRecoverySetupUtils.checkIsEmpty(description) ||
            !newPreset.countries ||
            newPreset.countries.length === 0 ||
            !newPreset.browsers ||
            newPreset.browsers.length === 0 ||
            isDuplicate ||
            (newPreset?.start_immediately && newPreset?.start_with_enddate === 1 && !newPreset?.prior_end_date) ||
            (!newPreset?.start_immediately && newPreset?.start_with_enddate === 0 && (newPreset?.schedule_preset.length === 0 || validateDates()))
        ) {
            return;
        }
        setValidate(false);
        if (!widgetId) {
            setLoading(true);
            Apis.createPresetAdBlockRecovery({
                ...newPreset,
                notice_text: adblockRecoverySetupUtils.convertEditorStateDataToHtml(description),
                schedule_preset: newPreset?.schedule_preset[0].startDate && newPreset?.schedule_preset[0].endDate ? newPreset?.schedule_preset : [],
                hide_notice: newPreset?.hide_notice_status ? parseInt(newPreset?.hide_notice) : 0,
                hide_notice_for: newPreset?.hide_notice_status ? parseInt(newPreset?.hide_notice_for) : 0,
                lock_access: newPreset?.lock_access_status ? parseInt(newPreset?.lock_access) : 0,
                lock_access_for: newPreset?.lock_access_status ? parseInt(newPreset?.lock_access_for) : 0,
            })
                .then(() => {
                    if (siteId) {
                        dispatch(SetupAdBlockRecoveryActions.fetchAllPresetSetupAdblock(siteId));
                    }
                    dispatch(MessageActions.showMessage({ text: `Preset created successfully!`, error: false }));
                    onCloseDrawer();
                })
                .catch((err) => {
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(true);
            Apis.editPresetAdBlockRecovery(
                {
                    ...newPreset,
                    notice_text: adblockRecoverySetupUtils.convertEditorStateDataToHtml(description),
                    schedule_preset: newPreset?.schedule_preset[0].startDate && newPreset?.schedule_preset[0].endDate ? newPreset?.schedule_preset : [],
                    hide_notice: newPreset?.hide_notice_status ? parseInt(newPreset?.hide_notice) : 0,
                    hide_notice_for: newPreset?.hide_notice_status ? parseInt(newPreset?.hide_notice_for) : 0,
                    lock_access: newPreset?.lock_access_status ? parseInt(newPreset?.lock_access) : 0,
                    lock_access_for: newPreset?.lock_access_status ? parseInt(newPreset?.lock_access_for) : 0,
                },
                widgetId,
            )
                .then(() => {
                    if (siteId) {
                        dispatch(SetupAdBlockRecoveryActions.fetchAllPresetSetupAdblock(siteId));
                    }
                    dispatch(MessageActions.showMessage({ text: `Preset updated successfully!`, error: false }));
                    onCloseDrawer();
                })
                .catch((err) => {
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    function handleEditDates(rawDates: any) {
        let dates = [];
        if (rawDates?.length === 0) {
            dates.push({ startDate: '', endDate: '' });
        } else {
            rawDates?.map((item: { start_date?: string; end_date?: string }) => dates.push({ startDate: item?.start_date, endDate: item?.end_date }));
        }
        return dates;
    }

    useEffect(() => {
        if (newPreset?.schedule_preset?.length > 0) {
            let dummyErrorData: { status: boolean; msg: string }[] = [];
            for (let i = 0; i < newPreset?.schedule_preset?.length; i++) {
                dummyErrorData.push({ status: true, msg: 'no error' });
            }
            setDateError(dummyErrorData);
            newPreset?.schedule_preset?.forEach((item: { startDate?: string; endDate?: string }, i: any) => {
                if (item?.startDate && item?.endDate) {
                    if (dayjs(item?.startDate).isAfter(item?.endDate)) {
                        dummyErrorData[i].status = false;
                        dummyErrorData[i].msg = 'start date can not be greater than end date!';
                        setDateError(dummyErrorData);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countDates, newPreset?.schedule_preset]);

    useEffect(() => {
        if (newPreset.start_with_enddate === 0 && newPreset?.start_immediately === true) {
            setNewPreset({
                ...newPreset,
                prior_end_date: null,
                schedule_preset: [{ startDate: '', endDate: '' }],
            });
        }
        if (newPreset.start_with_enddate === 0) {
            setNewPreset({
                ...newPreset,
                prior_end_date: null,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newPreset.start_with_enddate]);

    function removeDatePicker(key: any) {
        let filteredData = newPreset.schedule_preset?.filter((item: object, i: any) => {
            if (i !== key) return item;
            return null;
        });
        setNewPreset({
            ...newPreset,
            schedule_preset: filteredData,
        });
    }

    function addDatePicker() {
        const customPicker = { startDate: '', endDate: '' };
        setNewPreset({
            ...newPreset,
            schedule_preset: [...newPreset.schedule_preset, customPicker],
        });
    }

    const disableStartDate = (day: any) => {
        for (let i = 0; i < newPreset?.schedule_preset?.length - 1; i++) {
            let dumStartDate = newPreset?.schedule_preset[i]?.startDate;
            let dumEndDate = newPreset?.schedule_preset[i]?.endDate;
            let result = dayjs(day).isBetween(dumStartDate, dayjs(dumEndDate).add(1, 'days'));
            if (result) {
                return true;
            }
        }
        return false;
    };

    const disableEndDate = (day: any, startDate: any) => {
        for (let i = 0; i < newPreset?.schedule_preset?.length - 1; i++) {
            let dumStartDate = newPreset?.schedule_preset[i]?.startDate;
            let result = day >= dayjs(dumStartDate) && dayjs(startDate) < dayjs(dumStartDate);
            if (result) {
                return true;
            }
        }
        return false;
    };

    // async function translateText(text: string, targetLanguage: string) {
    //     const URL = `https://translation.googleapis.com/language/translate/v2?q=${text}&target=${targetLanguage}&source=${newPreset?.notice_text_language}&key=AIzaSyAZqHdRS9ixwKqIXUQEa7rEV5rjOQHQl5k`;
    //     let translatedData = await axios.post(URL);

    //     setNewPreset({
    //         ...newPreset,
    //         notice_text_language: targetLanguage,
    //     });
    //     return translatedData?.data?.data?.translations[0]?.translatedText;
    // }

    // const handleLangChange = async (e: any) => {
    //     const contentState = description.getCurrentContent();
    //     const plainText = contentState.getPlainText();

    //     const translatedText = await translateText(plainText, e.target.value);

    //     const translatedContentState = convertFromRaw({
    //         ...convertToRaw(contentState),
    //         blocks: [
    //             {
    //                 ...convertToRaw(contentState).blocks[0],
    //                 text: translatedText,
    //             },
    //         ],
    //     });

    //     const translatedEditorState = EditorState.createWithContent(translatedContentState);
    //     setDescription(translatedEditorState);
    // };
    return (
        <>
            <>
                {!widgetId && <RoundButton onClick={onClickCreateOrEdit} title="Create New Preset" className="w-[200px] text-[14px]" />}
                {widgetId && (
                    <span className="cursor-pointer ml-1" onClick={onClickCreateOrEdit}>
                        Edit
                    </span>
                )}
            </>
            <Drawer placement={'right'} width={'84%'} onClose={onCloseDrawer} open={openDrawer} closeIcon={null} closable={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                {!presetByWidIdLoader && (
                    <>
                        <div className="sticky top-0 bg-[#d7eae0] z-[100]">
                            <div className="flex justify-between items-center pt-5 pb-5 px-5">
                                <div className="text-[24px] font-[500] roboto">{widgetId ? `Edit Preset` : `Create New Preset`}</div>
                                <div className="flex gap-4">
                                    <div className="border rounded-3xl border-green-800">{siteId && <PreviewDrawer newPreset={newPreset} description={description || EditorState.createEmpty()} />}</div>
                                    <div className="border rounded-3xl border-green-800">
                                        <RoundButton title="Cancel" light={true} onClick={onCloseDrawer} style={{ width: '99px', fontSize: '14px', fontWeight: '500' }} />
                                    </div>
                                    <div>
                                        <RoundButton loading={loading} onClick={creteOrUpdatePreset} title={widgetId ? 'Save' : 'Create'} style={{ width: '99px', fontSize: '14px', fontWeight: '500' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between pt-5 pb-10 px-5">
                            <div className="w-[60%]">
                                <div className="bg-[#EFEFEF] pl-5 mt-5 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Basic Details</div>

                                <div className="flex gap-5 mx-5 mt-5">
                                    <div className="w-full">
                                        <div>
                                            <PNormalInput
                                                title="Preset Name"
                                                name="nick_name"
                                                value={newPreset.nick_name}
                                                onChange={(e) =>
                                                    setNewPreset({
                                                        ...newPreset,
                                                        nick_name: e.value ? String(e.value) : undefined,
                                                    })
                                                }
                                            />
                                            {isValidate && (!newPreset.nick_name || newPreset.nick_name.trim() === '') && <span className="common_error">Please enter name</span>}
                                            {isDuplicate && <span className="common_error">Selected Name Already exist in Preset</span>}
                                        </div>

                                        <div className="flex flex-col mt-4">
                                            <div className="montserrat mb-2">Preset Description</div>
                                            <div className="border-[#d9d9d9] rounded-lg border">
                                                {description && (
                                                    <div className="p-4">
                                                        <RichEditor value={description} onChanges={(newState) => setDescription(newState)} />
                                                    </div>
                                                )}
                                                <div>
                                                    <select
                                                        onChange={(e) => {
                                                            setNewPreset({ ...newPreset, notice_text_language: e.target.value });
                                                        }}
                                                        value={newPreset?.notice_text_language}
                                                        className="border-0 outline-none bg-[#F4F4F4] h-[30px] w-full rounded-b-lg pl-3 font-[400] font-[Roboto] text-[12px]"
                                                    >
                                                        {countriesLangCode?.map((item, key) => (
                                                            <option key={key} value={item.value}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            {isValidate && (!description || adblockRecoverySetupUtils.checkIsEmpty(description)) && <span className="common_error">Please enter discription</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* calender settings */}
                                <div>
                                    <div className="mt-8 bg-[#EFEFEF] pl-5 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Calendar Presets</div>
                                    <div className="px-5 mt-8 grid items-center md:grid-colos1 lg:grid-cols-2 xl:grid-cols-3">
                                        <div className="font-[Roboto] font-[700] text-[14px]"> Start Immediately</div>
                                        <div className={newPreset?.start_immediately ? 'ml-14 w-full' : 'ml-14 pointer-events-none opacity-20 w-full'}>
                                            <CommonDropDown
                                                dataList={calendarPreset}
                                                value={newPreset.start_with_enddate}
                                                setValue={(e: any) => {
                                                    setNewPreset({
                                                        ...newPreset,
                                                        start_with_enddate: e,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="text-end">
                                            <Switch
                                                checked={newPreset.start_immediately}
                                                onChange={() => {
                                                    setNewPreset({
                                                        ...newPreset,
                                                        start_immediately: !newPreset.start_immediately,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {newPreset?.start_with_enddate === 1 ? (
                                        <div className="mx-5 grid items-center mt-8 md:grid-colos1 lg:grid-cols-2 xl:grid-cols-3">
                                            <div className="font-[Roboto] font-[700] text-[14px]"> Select End Date</div>
                                            <div className="ml-14 flex flex-col">
                                                <DatePicker
                                                    style={{ height: '40px' }}
                                                    defaultOpen={newPreset?.start_with_enddate === 1 && !newPreset?.prior_end_date}
                                                    placeholder="Select End Date"
                                                    value={newPreset?.prior_end_date ? dayjs(newPreset?.prior_end_date) : null}
                                                    format={'MM/DD/YYYY'}
                                                    onChange={(e: any) => {
                                                        const date = e ? dayjs(e).format('YYYY/MM/DD') : null;
                                                        setNewPreset({
                                                            ...newPreset,
                                                            prior_end_date: date,
                                                        });
                                                    }}
                                                />
                                                {isValidate && (!newPreset.prior_end_date) && <span className="common_error">Please select End Date</span>}

                                            </div>
                                        </div>
                                    ) : null}

                                    <div className={!newPreset?.start_immediately ? '' : newPreset?.prior_end_date ? '' : 'pointer-events-none opacity-20'}>
                                        <div className="text-[14px] font-[700] font-[Roboto] mt-8 pl-5">Schedule the Presets</div>
                                        {newPreset?.schedule_preset?.map((item: any, key: any) => (
                                            <div key={key}>
                                                <div className="flex gap-5 mx-5 mt-5 items-center">
                                                    <div className="w-full">
                                                        <CustomDateInput
                                                            title={'Start Date'}
                                                            height={40}
                                                            disableDate={(e: any) => {
                                                                if (newPreset?.prior_end_date) {
                                                                    if (e <= dayjs(newPreset?.prior_end_date + 1)) {
                                                                        return true;
                                                                    } else {
                                                                        if (newPreset?.schedule_preset?.length > 1) {
                                                                            return disableStartDate(e);
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (e <= dayjs()) {
                                                                        return true;
                                                                    } else {
                                                                        if (newPreset?.schedule_preset?.length > 1) {
                                                                            return disableStartDate(e);
                                                                        }
                                                                    }
                                                                }
                                                                //return dayjs(e).isBetween('2023-04-04', dayjs('2023-04-14').add(1,'days'))
                                                            }}
                                                            format={'MM/DD/YYYY'}
                                                            selectedDate={item?.startDate}
                                                            setSelectedDate={(e: any) => {
                                                                setCountDates(countDates + 1);
                                                                let dates = newPreset?.schedule_preset;
                                                                dates[key].startDate = dayjs(e).format('YYYY/MM/DD');
                                                                setNewPreset({
                                                                    ...newPreset,
                                                                    schedule_preset: dates,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <CustomDateInput
                                                            title={'End Date'}
                                                            height={40}
                                                            disableDate={(e: any) => {
                                                                if (item?.startDate) {
                                                                    if (e < dayjs(item?.startDate)) {
                                                                        return true;
                                                                    } else {
                                                                        if (newPreset?.schedule_preset?.length > 1) {
                                                                            return disableEndDate(e, item?.startDate);
                                                                        }
                                                                    }
                                                                } else {
                                                                    return true;
                                                                }
                                                            }}
                                                            format={'MM/DD/YYYY'}
                                                            selectedDate={item?.endDate}
                                                            setSelectedDate={(e: any) => {
                                                                setCountDates(countDates + 1);
                                                                let dates = newPreset?.schedule_preset;
                                                                dates[key].endDate = dayjs(e).format('YYYY/MM/DD');
                                                                setNewPreset({
                                                                    ...newPreset,
                                                                    schedule_preset: dates,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="pl-3">
                                                        <RxCross2 className="cursor-pointer" size={20} onClick={() => removeDatePicker(key)} />
                                                    </div>
                                                </div>
                                                {!dateError[key]?.status ? <div className="mx-7 mt-1 font-bold font-[Roboto] text-red-600">{dateError[key]?.msg}</div> : null}
                                            </div>
                                        ))}
                                        {isValidate &&
                                            ((!newPreset?.start_immediately && newPreset?.start_with_enddate === 0) && (newPreset?.schedule_preset.length === 0 || validateDates()))
                                            && <span className="common_error ml-5">Please select Start Date and End Date</span>}

                                        <div className="mt-8 ml-5 border rounded-3xl border-green-800 w-fit">
                                            <RoundButton title="Add New Start-End Dates" light={true} onClick={addDatePicker} />
                                        </div>
                                    </div>
                                </div>

                                {/* country Browser and device setting section */}
                                <div>
                                    <div className="mt-12 bg-[#EFEFEF] pl-5 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Country,Browser & Device Settings</div>
                                    <div className="flex gap-5 ml-8 mt-8">
                                        <div className="w-full">
                                            <CommonDropDown
                                                title="Select Country"
                                                mode="multiple"
                                                dataList={CountryCodes}
                                                value={newPreset?.countries}
                                                placeholder="Select Multiple Countries"
                                                setValue={(e: any) => {
                                                    setNewPreset({
                                                        ...newPreset,
                                                        countries: e,
                                                    });
                                                }}
                                            />
                                            {isValidate && (!newPreset.countries || newPreset.countries.length === 0) && <span className="common_error">Please select countries</span>}
                                        </div>
                                        <div className="w-full">
                                            <CommonDropDown
                                                title="Select Browsers"
                                                mode="multiple"
                                                dataList={browser}
                                                value={newPreset?.browsers}
                                                placeholder="Select Multiple Browsers"
                                                setValue={(e: any) => {
                                                    setNewPreset({
                                                        ...newPreset,
                                                        browsers: e,
                                                    });
                                                }}
                                            />
                                            {isValidate && (!newPreset.browsers || newPreset.browsers.length === 0) && <span className="common_error">Please select browsers</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between h-[94px] bg-[#F5F5F5] rounded-lg ml-8 w-[580px] px-10 mt-5">
                                        <div className="flex items-center gap-5">
                                            <div className="font-semibold text-[16px]">Desktop</div>
                                            <div>
                                                <Switch
                                                    checked={newPreset?.desktop_preview}
                                                    onChange={() => {
                                                        setNewPreset({
                                                            ...newPreset,
                                                            desktop_preview: !newPreset.desktop_preview,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="font-semibold text-[16px]">Tablet</div>
                                            <div>
                                                <Switch
                                                    checked={newPreset?.tablet_preview}
                                                    onChange={() => {
                                                        setNewPreset({
                                                            ...newPreset,
                                                            tablet_preview: !newPreset.tablet_preview,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="font-semibold text-[16px]">Mobile</div>
                                            <div>
                                                <Switch
                                                    checked={newPreset.mobile_preview}
                                                    onChange={() => {
                                                        setNewPreset({
                                                            ...newPreset,
                                                            mobile_preview: !newPreset.mobile_preview,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Other Presets */}
                                <div>
                                    <div className="mt-12 bg-[#EFEFEF] pl-5 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Other Presets</div>
                                    <OtherPresets newPreset={newPreset} setNewPreset={setNewPreset} />
                                </div>
                                {/* customize appearance */}
                                <div>
                                    <div className="mt-12 bg-[#EFEFEF] pl-5 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Customize Appearance.</div>
                                    <PresetAppearance newPreset={newPreset} setNewPreset={setNewPreset} />
                                </div>
                            </div>

                            <div className="h-[500px] w-[31%] fixed right-5 border border-black">
                                <PreviewBox newPreset={newPreset} description={description || EditorState.createEmpty()} />
                            </div>
                        </div>
                    </>
                )}
                {presetByWidIdLoader && (
                    <div className="flex justify-center items-center h-full">
                        <Spin />
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default CreateOrEditPresetDrawer;

const calendarPreset = [
    { title: 'With No End Date', value: 0 },
    { title: 'With End Date', value: 1 },
];

const browser = [
    // { title: 'Select Multiple Browsers', value: '' },
    { title: 'All', value: 'All' },
    { title: 'Chrome', value: 'Chrome' },
    { title: 'Firefox', value: 'Firefox' },
    { title: 'Edge', value: 'Edge' },
    { title: 'Safari', value: 'Safari' },
    { title: 'Opera', value: 'Opera' },
    { title: 'Chromium', value: 'Chromium' },
    { title: 'Internet Explorer', value: 'Internet Explorer' },
    { title: 'Blisk', value: 'Blisk' },
];

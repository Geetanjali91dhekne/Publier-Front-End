const SetupAdBlockRecoveryTypes = {
    FETCH_TEXT_TRANSLATE: 'FETCH_TEXT_TRANSLATE',
    SET_TEXT_TRANSLATE: 'SET_TEXT_TRANSLATE',

    FETCH_ALLPRESET_SETUP_ADBLOCK: 'FETCH_ALLPRESET_SETUP_ADBLOCK',
    SET_ALLPRESET_SETUP_ADBLOCK: 'SET_ALLPRESET_SETUP_ADBLOCK',

    FETCH_PRESET_SETUP_ADBLOCK: 'FETCH_PRESET_SETUP_ADBLOCK',
    SET_PRESET_SETUP_ADBLOCK: 'SET_PRESET_SETUP_ADBLOCK',

    FETCH_COMPARE_DATA_SETUP_ADBLOCK: 'FETCH_COMPARE_DATA_SETUP_ADBLOCK',
    SET_COMPARE_DATA_SETUP_ADBLOCK: 'SET_COMPARE_DATA_SETUP_ADBLOCK',
};
export default SetupAdBlockRecoveryTypes;

export interface CreatePreset {
    site_id?: any;
    nick_name?: string;
    notice_text?: string;
    notice_text_language?: string;
    start_immediately?: boolean;
    start_with_enddate?: any;
    prior_end_date?: any;
    schedule_preset?: any;
    countries?: string[];
    browsers?: string[];
    desktop_preview?: boolean;
    tablet_preview?: boolean;
    mobile_preview?: boolean;
    notice_location?: string;
    show_notice_after?: string;
    hide_notice_status?: boolean;
    hide_notice?: any;
    hide_notice_for?: any;
    lock_access_status?: boolean;
    lock_access?: any;
    lock_access_for?: any;
    allow_close?: boolean;
    blur_content?: boolean;
    blur_content_percentage?: number;
    show_whitelist_instructions?: boolean;
    show_visits_left?: boolean;
    notice_bg_color?: string;
    notice_text_color?: string;
    notice_border_width?: string;
    notice_border_color?: string;
    link_color?: string;
    link_hover_color?: string;
    close_btn_bg_color?: string;
    close_btn_font_color?: string;
    whitelist_btn_color?: string;
    whitelist_btn_font_color?: string;
    whitelist_btn_location?: string;
    widget_id?:string;
    status?:boolean;
    adblock_pv?:number;
    adblock_users?:number;
}

export interface Preset {
    nick_name: string;
    site_id: string;
    status: 1 | 0;
    widget_id: string;
}

export interface SetupAdblockRecoveryStates {
    translatedText: any;
    translatedTextLoader: boolean;
    allPresets: Preset[];
    allPresetsLoader: boolean;
    presetByWidId: any;
    presetByWidIdLoader: boolean;
    comparisonPresetData: CreatePreset[];
    comparisonPresetDataLoader: boolean;
}

import { RecursiveKeyOf } from '~/core/types/common';

export type SetupModalContentType = {
    language;
    units;
    defaultCity;
    about;
};

export type SetupBlanksType = {
    label: string;
    to: RecursiveKeyOf<SetupModalContentType>;
};

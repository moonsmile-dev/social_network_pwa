// #region Global Imports
import { WithTranslation } from "next-i18next";
// #endregion Global Imports

declare namespace IPostItem {
    export interface IProps extends WithTranslation { }

    export interface InitialProps {
        namespacesRequired: string[];
    }

    export interface IStateProps { }

    namespace Actions {
        export interface IMapPayload { }

        export interface IMapResponse { }
    }
}

export { IPostItem };

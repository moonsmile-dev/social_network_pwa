import { WithTranslation } from "next-i18next";

declare namespace IAccountChat {
    export interface IProps extends WithTranslation { }

    export interface InitialProps {
        namespacesRequired: string[];
    }

    export interface IStateProps {}

    namespace Actions {
        export interface IMapPayload {}

        export interface IMapResponse {}
    }
}

export { IAccountChat };

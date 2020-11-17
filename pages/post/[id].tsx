import { NextPage } from "next";
import { IPostItem } from "@Interfaces"
import { withTranslation } from "@Server/i18n";
import { UserPost } from "@Components/Basic";



const PostItem: NextPage<IPostItem.IProps, IPostItem.InitialProps> = ({ }) => {
    return (
        <div style={{ border: "solid 1px black" }}>
            <UserPost isDetail />
        </div>
    );
};
const Extended = withTranslation("common")(PostItem);

export default Extended;

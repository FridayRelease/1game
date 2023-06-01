import {FC, useState} from "react";
import { ReactComponent as PlusInRing } from '@/assets/images/icons/create.svg';
import ButtonNew from "@/components/button-new/button-new";
import '../forum.scss';
import {Modal} from "@/features/forum/components/modal";

/**
 Title Страницы форума
 @category component
 */
export const TitleForum = () => {

     return (
        <div className="forum-title-create row ">
            <div className="forum-title left">
                <label className="red">Ф</label>
                <label className="white">ОРУМ</label>
            </div>

        </div>
    );
}
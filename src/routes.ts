import {compteGetAllAction} from "./controller/compte_get_all_action";
import {compteGetByIdAction} from "./controller/compte_get_by_id_action";
import {comptePostAction} from "./controller/compte_post_action";
import {compteDeleteByIdAction} from "./controller/compte_delete_by_id_action";
import {Request, Response} from "express";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface Route {
    path: string;
    method: HttpMethod;
    action: (req: Request, res: Response) => Promise<void>;
}

export const AppRoutes: Route[] = [
    {
        path: "/",
        method: "get",
        action: compteGetAllAction,
    },
    {
        path: "/compte/:id",
        method: "get",
        action: compteGetByIdAction,
    },
    {
        path: "/compte",
        method: "post",
        action: comptePostAction,
    },
    {
        path: "/compte/:id",
        method: "post",
        action: compteDeleteByIdAction,
    }
]
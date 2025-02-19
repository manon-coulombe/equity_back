import {compteGetAllAction} from "./controller/compte/CompteGetAllAction";
import {compteGetByIdAction} from "./controller/compte/CompteGetByIdAction";
import {comptePostAction} from "./controller/compte/ComptePostAction";
import {compteDeleteByIdAction} from "./controller/compte/CompteDeleteByIdAction";
import {Request, Response} from "express";
import {transactionGetAllByCompteIdAction} from "./controller/transaction/TransactionGetAllByCompteIdAction";
import {transactionGetByIdAction} from "./controller/transaction/TransactionGetByIdAction";
import {transactionPostAction} from "./controller/transaction/TransactionPostAction";
import {transactionDeleteByIdAction} from "./controller/transaction/TransactionDeleteByIdAction";
import {transactionUpdateAction} from "./controller/transaction/TransactionUpdateAction";
import {compteUpdateAction} from "./controller/compte/CompteUpdateAction";
import {participantsGetByCompteAction} from "./controller/participant/ParticipantGeByCompteAction";
import {participantGetByIdAction} from "./controller/participant/ParticipantGetByIdAction";
import {participantPostAction} from "./controller/participant/ParticipantPostAction";
import {participantDeleteAction} from "./controller/participant/ParticipantDeleteAction";
import {participantUpdateAction} from "./controller/participant/ParticipantUpdateAction";

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
        method: "delete",
        action: compteDeleteByIdAction,
    },
    {
        path: "/compte/:id",
        method: "patch",
        action: compteUpdateAction,
    },
    {
        path: "/compte/:id/transactions",
        method: "get",
        action: transactionGetAllByCompteIdAction,
    },
    {
        path: "/transaction/:id",
        method: "get",
        action: transactionGetByIdAction,
    },
    {
        path: "/transaction",
        method: "post",
        action: transactionPostAction,
    },
    {
        path: "/transaction/:id",
        method: "delete",
        action: transactionDeleteByIdAction,
    },
    {
        path: "/transaction/:id",
        method: "patch",
        action: transactionUpdateAction,
    },
    {
        path: "/compte/:id/participants",
        method: "get",
        action: participantsGetByCompteAction,
    },
    {
        path: "/participant/:id",
        method: "get",
        action: participantGetByIdAction,
    },
    {
        path: "/participant",
        method: "post",
        action: participantPostAction,
    },
    {
        path: "/participant/:id",
        method: "delete",
        action: participantDeleteAction,
    },
    {
        path: "/participant/:id",
        method: "patch",
        action: participantUpdateAction,
    },
]
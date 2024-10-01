import React from "react";
import { Nomination_Pools_Bonded_Pools_Json } from "polkadot-typed-api/types/api/query/nominationPools/bondedPools";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { utils } from "polkadot-typed-api";
import { api } from "polkadot-typed-api";
import { toBigNumber } from "common-crypto-tools";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { polkadotBalanceValue } from "@/utils/polkadotBalanceValue";

const _polkadotExplorerUrl = utils.polkadotExplorerUrl("polkadot");

type PoolCardProps = {
  pool: Nomination_Pools_Bonded_Pools_Json;
  id: number;
};

export const PoolCard: React.FC<PoolCardProps> = ({ pool, id }) => {
  const [poolMetadata, set_poolMetadata] = React.useState<string | null>(null);

  async function loadPoolMetadata(id: number) {
    const apiPromise = await loadApiPromise();

    const metadata = await api.query.nominationPools.metadata(apiPromise, id);

    set_poolMetadata(metadata);
  }

  React.useEffect(() => {
    void loadPoolMetadata(id);
  }, [id]);

  return (
    <Card className="w-full flex bg-gray-950">
      <CardHeader className="justify-between px-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Nomination pool {id}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {poolMetadata || "..."}
            </h5>
          </div>
        </div>
        <Button
          as={Link}
          color="primary"
          href={_polkadotExplorerUrl("nomination_pool", id)}
          radius="full"
          size="sm"
          target="_blank"
          variant={"bordered"}
        >
          Open Subscan
        </Button>
      </CardHeader>
      <CardBody className="px-4 py-0 text-small text-default-400">
        <p>Pool commission: {pool.commission.current || "0"}</p>
        <p>
          Pool commission max:{" "}
          {pool.commission.changeRate
            ? pool.commission.changeRate.maxIncrease
            : "0"}
        </p>
      </CardBody>
      <CardFooter className="gap-4 px-4">
        <div className="flex gap-2">
          <p className=" text-default-400 text-small">Members:</p>
          <p className="font-semibold text-default-400 text-small">
            {pool.memberCounter}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-default-400 text-small">Total pool stake</p>
          <p className="font-semibold text-default-400 text-small">
            {polkadotBalanceValue(toBigNumber(+pool.points))}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

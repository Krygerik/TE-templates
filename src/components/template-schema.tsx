import * as React from "react";
import {uniqWith} from "lodash";
// @ts-ignore
import Graph from "react-graph-vis";

type TZoneConnection = {
  id1: number;
  id2: number;
};

type TProps = {
  zoneList?: Record<string, any>[];
};

export const TemplateSchema = (
  {
    zoneList,
  }: TProps,
) => {
  const zoneIdList = zoneList.map(x => x.zoneId);
  const dirtyZoneConnection = zoneList.reduce<TZoneConnection[]>((acc: TZoneConnection[], item: Record<string, any>) => ([
    ...acc,
    ...item.connections.map((connection: any) => ({ id1: item.zoneId, id2: connection.connect_to }))
  ]), [] as TZoneConnection[]);
  const clearZoneConnection = uniqWith(dirtyZoneConnection, (zone1, zone2) => (
      zone1.id1 === zone2.id2 && zone1.id2 === zone2.id1
  ));

  const graph = {
    nodes: zoneIdList.map(zoneId => ({
      id: zoneId,
      label: (zoneId === 1 || zoneId === 2) ? "Стартовая локация" : "Локация №" + zoneId,
      title: "tooltip",
    })),
    edges: clearZoneConnection.map(connection => ({
      from: connection.id1,
      to: connection.id2
    })),
  };

  return (
    <div
      style={{ height: "500px" }}
    >
      <Graph
        option={{
          interaction: {
            dragNodes: false,
          },
          physics: {
            enabled: false,
          },
          edges: {
            physics: false,
          },
        }}
        graph={graph}
      />
    </div>
  )
}

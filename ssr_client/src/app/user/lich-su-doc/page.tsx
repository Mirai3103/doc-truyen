import React from "react";
import Bread from "./BreadCrumbs";
import HistoryView from "./HistoryView";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Bread />
      <h1 className="text-2xl lg:text-3xl font-bold  lg:pl-8">Lịch sử đọc</h1>
      <HistoryView />
    </div>
  );
}

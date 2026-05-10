"use client";

import { useMemo, useState } from "react";
import { GACHA_PRIZES } from "./config/config";
import { Prize } from "./types/prize";

export default function Home() {
  const [flushing, setFlushing] = useState(false);
  const [showPoop, setShowPoop] = useState(false);

  const [result, setResult] = useState<Prize | null>(null);

  // ガチャ袋
  const initialPool = useMemo(() => {
    return GACHA_PRIZES.flatMap((prize) =>
      Array(prize.count).fill(prize)
    );
  }, []);

  const [pool, setPool] = useState<Prize[]>(initialPool);

  const startGacha = async () => {
    if (flushing) return;

    if (pool.length === 0) {
      alert("ガチャが空です！");
      return;
    }

    // 初期化
    setFlushing(true);
    setShowPoop(false);
    setResult(null);

    // ランダム抽選（非復元）
    const index = Math.floor(Math.random() * pool.length);

    const selected = pool[index];

    // ガチャ演出
    await wait(1800);

    setShowPoop(true);

    setFlushing(false);

    // 抽選したものを除外
    const nextPool = [...pool];
    nextPool.splice(index, 1);

    setPool(nextPool);

    setResult(selected);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-sky-100 overflow-hidden">

      {/* 残数表示 */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <div className="w-56 rounded-xl bg-white/80 p-4 shadow">

          <h2 className="mb-3 text-lg font-bold text-zinc-800">
            残り個数
          </h2>

          <div className="space-y-2">
            {GACHA_PRIZES.map((prize) => {
              const remain = pool.filter(
                (p) => p.id === prize.id
              ).length;

              return (
                <div
                  key={prize.id}
                  className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2"
                >
                  <span className="font-mono font-bold text-zinc-800">
                    {prize.label}
                  </span>

                  <span className="font-mono font-bold text-zinc-800">
                    {remain} / {prize.count}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t pt-3 flex items-center justify-between text-sm">
            <span className="text-zinc-600">
              合計
            </span>

            <span className="font-mono font-bold text-zinc-800">
              {pool.length} / {initialPool.length}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center">

        {/* タイトル */}
        <h1 className="mb-10 text-4xl font-bold text-zinc-800">
          トイレガチャ
        </h1>

        {/* トイレ */}
        <div className="relative">

          {/* タンク */}
          <div className="mx-auto h-32 w-56 rounded-2xl border-4 border-zinc-400 bg-white relative">

            {/* レバー */}
            <button
              onClick={startGacha}
              className={`absolute -right-10 top-10 h-5 w-16 rounded-full transition-all ${flushing
                ? "rotate-45 bg-zinc-500"
                : "bg-zinc-700 hover:bg-zinc-600"
                }`}
            />
          </div>

          {/* 便座 */}
          <div className="relative mx-auto -mt-2 flex h-72 w-80 items-center justify-center rounded-b-[120px] rounded-t-[80px] border-[10px] border-zinc-300 bg-white overflow-hidden">

            {flushing && (
              <div className="absolute inset-0 animate-pulse bg-cyan-300/70" />
            )}

            {flushing && (
              <div className="absolute h-40 w-40 animate-spin rounded-full border-[12px] border-dashed border-cyan-600 opacity-70" />
            )}

            <div className="absolute h-36 w-36 rounded-full bg-zinc-900" />
          </div>

          {/* うんち */}
          {showPoop && result && (
            <div
              className="absolute left-1/2 top-10 flex h-40 w-40 -translate-x-1/2 -translate-y-12 scale-110 flex-col items-center justify-center transition-all duration-700"
            >
              <div className="mb-3 text-6xl">
                💩
              </div>

              <div
                className={`rounded-2xl px-8 py-4 text-4xl font-extrabold shadow-2xl ${result.bgColor} ${result.textColor}`}
              >
                {result.label}
              </div>
            </div>
          )}
        </div>

        <p className="mt-12 text-zinc-600">
          レバーをクリックしてガチャを回そう！
        </p>
      </div>
    </main>
  );
}

function wait(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}
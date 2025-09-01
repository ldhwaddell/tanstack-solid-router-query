import { createFileRoute } from "@tanstack/solid-router";
import { useQuery } from "@tanstack/solid-query";
import * as Solid from "solid-js";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const repo = useQuery(() => ({
    queryKey: ["repoData"],
    queryFn: async () => {
      const r = await fetch(
        "https://api.github.com/repos/tannerlinsley/react-query",
      );
      if (!r.ok) throw new Error("request failed");
      return r.json();
    },
  }));

  return (
    <div class="flex flex-col">
      <Solid.Switch>
        <Solid.Match when={repo.isPending}>Loading…</Solid.Match>
        <Solid.Match when={repo.isError}>
          Error: {repo.error?.message}
        </Solid.Match>
        <Solid.Match when={repo.isSuccess}>
          <div>
            <h1>{repo.data.name}</h1>
            <p>{repo.data.description}</p>
            <strong>👀 {repo.data.subscribers_count}</strong>{" "}
            <strong>✨ {repo.data.stargazers_count}</strong>{" "}
            <strong>🍴 {repo.data.forks_count}</strong>
          </div>
        </Solid.Match>
      </Solid.Switch>
    </div>
  );
}

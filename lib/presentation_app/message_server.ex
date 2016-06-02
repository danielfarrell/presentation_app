defmodule PresentationApp.MessageServer do
  def start_link do
    Agent.start_link(fn -> [] end, name: __MODULE__)
  end

  @doc "Puts a message on the log"
  def put_message(message) do
    Agent.update(__MODULE__, fn state -> ([message | state] |> Enum.slice(0, 20)) end)
  end

  @doc "Gets all the messages on the log"
  def get_all() do
    Agent.get(__MODULE__, fn state -> state end)
  end
end

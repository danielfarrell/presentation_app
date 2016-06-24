defmodule PresentationApp.ChatChannel do
  use PresentationApp.Web, :channel
  alias PresentationApp.{Presence, MessageServer}

  def join("chat", payload, socket) do
    if authorized?(payload) do
      socket = assign(socket, :username, payload["username"])
      send(self, :after_join)
      reply = MessageServer.get_all() |> Enum.reverse
      {:ok, reply, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("shout", payload, socket) do
    msg = Map.put(payload, :timestamp, :os.system_time(:milli_seconds))
    MessageServer.put_message(msg)
    broadcast socket, "shout", msg
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.username, %{
      online_at: inspect(System.system_time(:seconds))
    })
    push socket, "presences", Presence.list(socket)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end

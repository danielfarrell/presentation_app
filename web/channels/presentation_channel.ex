defmodule PresentationApp.PresentationChannel do
  use PresentationApp.Web, :channel
  alias PresentationApp.{Presence, MessageServer}

  def join("presentation", payload, socket) do
    if authorized?(payload) do
      socket = assign(socket, :username, payload["username"])
      send(self, :after_join)
      reply = MessageServer.get_all() |> Enum.reverse
      {:ok, reply, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (chat:lobby).
  def handle_in("shout", payload, socket) do
    msg = Map.put(payload, :timestamp, :os.system_time(:milli_seconds))
    MessageServer.put_message(msg)
    broadcast socket, "shout", msg
    {:noreply, socket}
  end

  # Slide changing event
  def handle_in("slidechanged", payload, socket) do
    broadcast_from socket, "slidechanged", payload
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

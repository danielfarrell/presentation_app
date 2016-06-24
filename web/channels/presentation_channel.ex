defmodule PresentationApp.PresentationChannel do
  use PresentationApp.Web, :channel

  def join("presentation", _payload, socket) do
    {:ok, socket}
  end

  # Slide changing event
  def handle_in("slidechanged", payload, socket) do
    broadcast_from socket, "slidechanged", payload
    {:noreply, socket}
  end
end

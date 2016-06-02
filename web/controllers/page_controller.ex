defmodule PresentationApp.PageController do
  use PresentationApp.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

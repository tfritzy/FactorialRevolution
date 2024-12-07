using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace FactorialRevolution.Pages
{
    public partial class Game : ComponentBase
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; } = default!;

        [Inject]
        private ILogger<Game> Logger { get; set; } = default!;

        private readonly GameState _gameState = new();
        private const int MapSize = 10;

        protected override void OnInitialized()
        {
            InitializeMap();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                try
                {
                    var dotNetRef = DotNetObjectReference.Create(this);
                    await JSRuntime.InvokeVoidAsync("initializeGame", _gameState.Tiles, dotNetRef);
                }
                catch (Exception ex)
                {
                    Logger.LogError($"Error in OnAfterRenderAsync: {ex}");
                }
            }
        }

        private void InitializeMap()
        {
            _gameState.Tiles.Clear();
            for (int x = 0; x < MapSize; x++)
            {
                for (int y = 0; y < MapSize; y++)
                {
                    _gameState.Tiles.Add(new Tile
                    {
                        X = x,
                        Y = y,
                        Type = "grass",
                        IsInteractive = (x + y) % 2 == 0
                    });
                }
            }
        }

        [JSInvokable]
        public async Task HandleTileClick(int x, int y)
        {
            var clickedTile = _gameState.Tiles.Find(t => t.X == x && t.Y == y);
            if (clickedTile?.IsInteractive == true)
            {
                _gameState.IsUIOpen = true;
                _gameState.ActiveTileType = clickedTile.Type;
                _gameState.ActiveTile = clickedTile;
                await InvokeAsync(StateHasChanged);
            }
        }

        [JSInvokable]
        public async Task CloseTileUI()
        {
            _gameState.IsUIOpen = false;
            _gameState.ActiveTile = null;
            await InvokeAsync(StateHasChanged);
        }
    }

    public class Tile
    {
        public int X { get; set; }
        public int Y { get; set; }
        public string Type { get; set; } = string.Empty;
        public bool IsInteractive { get; set; }
    }

    public class GameState
    {
        public List<Tile> Tiles { get; set; } = new();
        public bool IsUIOpen { get; set; }
        public string ActiveTileType { get; set; } = string.Empty;
        public Tile? ActiveTile { get; set; }
    }
}
package paquete;
import java.awt.Color;
import java.awt.Graphics;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JPanel;
public class PanelSnake extends JPanel{
    Color colorsnake = Color.BLUE;
    Color colorcomida = Color.RED;
    int tammax, tam, can, res;
    List<int[]> snake = new ArrayList<>();
    int[] comida;
    String direccion = "derecha";
    
    public PanelSnake(int tammax, int can){
        this.tammax = tammax;
        this.can = can;
        this.tam = tammax / can;
        this.res = tammax % can;
        int[] a = {can / 2 - 1, can / 2 -1};
        int[] b = {can / 2, can / 2 -1};
        snake.add(a);
        snake.add(b);
    }
    @Override
    public void paint(Graphics pintor){
        super.paint(pintor);
        pintor.setColor(colorsnake);
        
        for (int[] par:snake){
            pintor.fillRect(res / 2 + par [0] * tam, res / 2 + par [1] * tam, tam - 1, tam - 1);
        }
    }
    public void avanzar(){
        int [] ultimo = snake.get(snake.size() - 1);
        int agregarx = 0;
        int agregary = 0;
        switch(direccion){
            case "de": agregarx = 1; break;
            case "iz": agregarx = -1; break;
            case "ar": agregary = -1; break;
            case "ab": agregary = 1; break;
        }
        int [] nuevo = {ultimo[0] + agregarx, ultimo[1] + agregary};
        snake.add(nuevo);
        snake.remove(0);
    }
}

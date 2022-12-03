package problemas.matematicos;
import java.util.Scanner;
/**
 *
 * @author isai_
 */
public class ExmasI {
    /*
    este rpoblema conocido
    */
    int par, impar, n = 0;
    /*
    la formula es:
    si es par   --> x / 2
    si es impar --> 3x + 1
    */
    public int formula(int x){
        do{
            if(x%2==0){ //pares --> x / 2
                par = x;
                x = par / 2;
                n++;
                System.out.println(n + "--> " + x);
            }else{ //impares --> 3x + 1
                impar = x;
                x = 3 * (impar) + 1;
                n++;
                System.out.println(n + "--> " + x);
            }
        }while(n != 1000000);
        return x;
    }
    public static void main(String[] args) {
        int x;
        ExmasI f = new ExmasI();
        Scanner sc = new Scanner(System.in);
        System.out.println("El proble de 3x + 1 es que una funcion interminable \nque nunca tiende a crecer a infinito, \nen cambio, tiende a decaer a un bucle, \ndicho bucle es 4 2 1.");
        System.out.println("\nEsto sucede con cualquier numero entero positivo. \nIngrese un numero entero positivo al azar: ");
        x = sc.nextInt();
        f.formula(x);
    }
}
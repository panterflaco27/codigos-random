//asteroid by panterflac :v
#include <stdio.h>
#include <windows.h>
#include <conio.h>
#include <stdlib.h>
#include <list>
using namespace std;

#define ARRIBA 72
#define IZQUIERDA 75
#define DERECHA 77
#define ABAJO 80

int puntos = 0, asd = 0;

void gotoxy(int x, int y){
	HANDLE hCon;
	hCon = GetStdHandle(STD_OUTPUT_HANDLE);
	//asignar coordenadas
	COORD dwPos;
	dwPos.X = x;
	dwPos.Y = y;
	//posicionar en las coordenadas
    SetConsoleCursorPosition(hCon, dwPos);   
}

void ocultar(){
	HANDLE hCon;
	hCon = GetStdHandle(STD_OUTPUT_HANDLE);
	
	CONSOLE_CURSOR_INFO cc;
	cc.dwSize = 2;
	cc.bVisible = FALSE;
	SetConsoleCursorInfo(hCon, &cc);
}

void limites(){
	for(int i = 2; i < 78; i++){
		gotoxy(i,3); printf("%c",205);
		gotoxy(i,33); printf("%c",205);
	}
	for(int i = 4; i < 33; i++){
		gotoxy(2, i); printf("%c",186);
		gotoxy(77, i); printf("%c",186);
	}
	gotoxy(2,3); printf("%c",201);
	gotoxy(2,33); printf("%c",200);
	gotoxy(77,3); printf("%c",187);
	gotoxy(77,33); printf("%c",188);
}
void final(){
	for(int i = 0; i < 78; i++){
		for(int j = 0; j < 35; j++){
			gotoxy(i,j); printf(" ");
		}
	}
	gotoxy(14,5); printf("    = #### #### #   # ####   ##  #   # #### ###  =");
	gotoxy(14,6); printf("   == #    #  # ## ## #     #  # #   # #    #  # ==");
	gotoxy(14,7); printf("  === # ## #### # # # ###   #  # #   # ###  ###  ===");
	gotoxy(14,8); printf(" ==== #  # #  # #   # #     #  #  # #  #    # #  ====");
	gotoxy(14,9); printf("===== #### #  # #   # ####   ##    #   #### #  # =====");
	gotoxy(14,13); printf("Puntos conseguidos %d", puntos);
	gotoxy(14, 14); printf("Asteroides destruidos: %d", asd);
	
}

/*=========================================================================================================================================================*/
class NAVE{
	int x,y;
	int corazones;
	int vidas;
	public:
		NAVE(int _x, int _y, int _corazones, int _vidas) : x(_x), y(_y), corazones(_corazones), vidas(_vidas){}
		int X(){
			return x;
		}
		int Y(){
			return y;
		}
		void cor(){
			corazones--;
		}
		int V(){
			return vidas;
		}
		void pintar();
		void borrar();
		void mover();
		void pintar_corazones();
		void morir();
};

void NAVE::pintar(){
	gotoxy(x,y);   printf("  %c",30);
	gotoxy(x,y+1); printf(" %c%c%c",40,207,41);
	gotoxy(x,y+2); printf("%c%c%c%c%c",205,206,35,206,205);
	gotoxy(x,y+3); printf(" %c %c ",31,31);
}

void NAVE::borrar(){
	gotoxy(x,y);   printf("      ");
	gotoxy(x,y+1); printf("      ");
	gotoxy(x,y+2); printf("      ");
	gotoxy(x,y+3); printf("      ");
}

void NAVE::mover(){
	if(kbhit()){
		char tecla = getch();
		borrar();
		if(tecla == IZQUIERDA && x > 3) x--;
		if(tecla == DERECHA && x+4 < 76) x++;
		if(tecla == ARRIBA && y > 4) y--;
		if(tecla == ABAJO && y+4 < 33) y++;
		if(tecla == 'e') corazones--;
		pintar();
		pintar_corazones();
	}
}

void NAVE::pintar_corazones(){
	gotoxy(50,2); printf("Vidas: %d", vidas);
	gotoxy(64,2); printf("Salud");
	gotoxy(70,2); printf("     ");
	for(int i = 0; i < corazones; i++){
		gotoxy(70+i,2); printf("%c",3);
	}
}

void NAVE::morir(){
	if(corazones == 0){
		borrar();
		gotoxy(x,y);   printf("   *   ");
		gotoxy(x,y+1); printf("  ***  ");
		gotoxy(x,y+2); printf(" ***** ");
		gotoxy(x,y+3); printf("  * *  ");
		Sleep(200);
		borrar();
		gotoxy(x,y);   printf("  * *  ");
		gotoxy(x,y+1); printf(" ** ** ");
		gotoxy(x,y+2); printf("*** ***");
		gotoxy(x,y+3); printf("**   **");
		Sleep(200);
		borrar();
		gotoxy(x,y);   printf("   *   ");
		gotoxy(x,y+1); printf("  * *  ");
		gotoxy(x,y+2); printf("  * *  ");
		gotoxy(x,y+3); printf("   *   ");
		Sleep(200);
		borrar();
		
		vidas--;
		corazones = 3;
		pintar_corazones();
		pintar();
	}
}

/*=========================================================================================================================================================*/
class AST{
	int x;
	int y;
	public:
		AST(int _x, int _y) : x(_x), y(_y){}
		void pintar();
		void mover();
		void choque(class NAVE &N);
		int X(){
			return x;
		}
		int Y(){
			return y;
		}
};

void AST::pintar(){
	gotoxy(x,y); printf("%c",64);
}

void AST::mover(){
	gotoxy(x,y); printf(" ");
	y++;
	if(y > 32){
		x = rand()%71 + 4;
		y = 4;
	}
	pintar();
}

void AST::choque(class NAVE &N){
	if(x >= N.X() && x < N.X()+6 && y >= N.Y() && y <= N.Y()+3){
		N.cor();
		N.borrar();
		N.pintar();
		N.pintar_corazones();
		x = rand()%71 + 4;
		y = 4;
	}
}

/*=========================================================================================================================================================*/
class BALA{
	int x, y;
	public:
		BALA(int _x, int _y) : x(_x), y(_y){};
		int X(){
			return x;
		}
		int Y(){
			return y;
		}
		void mover();
		bool fuera();
};

void BALA::mover(){
	gotoxy(x,y); printf(" ");
	y--;
	gotoxy(x,y); printf("%c",94);
}

bool BALA::fuera(){
	if(y == 4) return true;
	return false;
}

/*=========================================================================================================================================================*/
int main(){
	printf("CONTROLES=> disparar: A arriba: UP abajo: DOWN izquierda: LEFT derecha: RIGHT");
	ocultar();
	limites();
	NAVE N(36, 29, 3, 3);
	N.pintar();
	N.pintar_corazones();
	
	list <AST*> A;
	list<AST*> :: iterator ita;
	for(int i = 0; i < 5; i++){
		A.push_back(new AST(rand()%71 + 3, rand()%5 + 4));
	}
	
	list <BALA*> B;
	list <BALA*> :: iterator it;
	
	bool gameover = false;
	while(!gameover){
		gotoxy(4,2); printf("Puntos: %d",puntos);
		if(kbhit()){
			char tecla = getch();
			if(tecla == 'a')
			B.push_back(new BALA(N.X() + 2, N.Y() - 1));
		}
		
		for(it = B.begin(); it != B.end(); it++){
			(*it) -> mover();
			if((*it)->fuera()){
				gotoxy((*it)->X(), (*it)->Y()); printf(" ");
				delete(*it);
				it = B.erase(it);
			}
		}
		
		for(ita = A.begin(); ita != A.end(); ita++){
			(*ita)->mover();
			(*ita)->choque(N);
		}
		
		for(ita = A.begin(); ita != A.end(); ita++){
			for(it = B.begin(); it != B.end(); it++){
				if((*ita)->X() == (*it)->X() && ((*ita)->Y() + 1 == (*it)->Y() || (*ita)->Y() == (*it)->Y())){
					gotoxy((*it)->X(),(*it)->Y()); printf(" ");
					delete(*it);
					it = B.erase(it);
					
					A.push_back(new AST(rand()%71 + 3, 4));
					gotoxy((*ita)->X(),(*ita)->Y()); printf(" ");
					delete(*ita);
					ita = A.erase(ita);
					
					asd++;
					puntos+=5;
				}
			}
		}
		
		if(N.V() == 0){
			gameover = true;
		}
		
		N.morir();
		N.mover();
		Sleep(30);
	}
	
	final();
	
	return 0;
}
